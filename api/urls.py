from django.urls import path, re_path
from rest_framework_simplejwt import views as jwt_views
from . import views

urlpatterns = [
    path('users', views.CustomUserCreate.as_view(), name="users"),
    re_path(r'^muscle_group$', views.MuscleGroup),
    re_path(r'^muscle_group/(?P<pk>[0-9]+)$', views.MyMuscleGroup),
    path('token/obtain', views.MyTokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
