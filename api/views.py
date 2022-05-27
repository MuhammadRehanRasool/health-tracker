from django.shortcuts import render

# Create your views here.
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from . import serializers
from . import models
from django.http.response import JsonResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['id'] = self.user.id
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['first_name'] = self.user.first_name
        data['last_name'] = self.user.last_name
        data['signedUpAt'] = self.user.signedUpAt
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = serializers.CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                pass
            except:
                return JsonResponse({'message': "Username is already used!"}, status=status.HTTP_200_OK)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse({'message': serializer.errors}, status=status.HTTP_200_OK)

    def get(self, request):
        users = models.CustomUser.objects.all()
        users_serializer = serializers.ViewUserSerializer(
            users, many=True)
        return JsonResponse(users_serializer.data, safe=False)


class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello": "world"}, status=status.HTTP_200_OK)
