from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializer import TaskSerializer, UserSerializer, UserSerializerWithToken
from .models import Tasks
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# for sending mails and generating tokens
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .utils import TokenGenerator, generate_token
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View
import threading

class EmailThread(threading.Thread):
    def __init__(self, email_message):
        self.email_message=email_message
        threading.Thread.__init__(self)

    def run(self):
        self.email_message.send()


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/tasks/',
        '/tasks/<id>/',
        '/users/',
        '/profile/',
        '/api/token/',
    ]
    return Response(routes)


@api_view(['GET'])
def getTasks(request):
    tasks = Tasks.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTask(request, pk):
    task = Tasks.objects.get(_id=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)


    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfiles(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


class EmailThread(threading.Thread):
    def __init__(self, email_message):
        self.email_message = email_message
        threading.Thread.__init__(self)

    def run(self):
        self.email_message.send()


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['fname'], 
            last_name=data['lname'], 
            username=data['email'], 
            email=data['email'], 
            password=make_password(data['password']), 
            is_active=False
        )
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = generate_token.make_token(user)
        activate_url = f"http://127.0.0.1:8000/api/activate/{uidb64}/{token}/"

        email_subject = "Please activate your account"
        message = f"Hi {user.first_name},\n\nPlease click the link below to activate your account:\n{activate_url}"
        
        email_message = EmailMessage(
            email_subject, 
            message, 
            settings.EMAIL_HOST_USER, 
            [data['email']]
        )
        EmailThread(email_message).start()

        message = {'details': 'Activate your account, activation link sent to your email'}
        return Response(message)
    except Exception as e:
        message = {'details': "User Already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


class ActivateAccountView(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except Exception as e:
            user = None

        if user is not None and generate_token.check_token(user, token):
            user.is_active = True
            user.save()
            return render(request, "activatesuccess.html")
        else:
            return render(request, "activatefail.html")
