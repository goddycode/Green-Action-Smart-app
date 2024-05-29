from eSmartapp import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

urlpatterns = [
    path('', views.getRoutes, name="getRoutes"),
    path('tasks/', views.getTasks, name="getTasks"),
    path('task/<str:pk>', views.getTask, name="getTask"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.getUserProfiles, name="getUserProfiles"),
    path('users/', views.getUsers, name="getUsers"),
    path('users/register/', views.registerUser, name="register"),
    path('activate/<uidb64>/<token>', views.ActivateAccountView.as_view(), name='activate'),
]
