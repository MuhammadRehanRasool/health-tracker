from django.shortcuts import render

# Create your views here.
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from . import serializers
from . import models
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
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


@api_view(['GET', 'POST', 'DELETE'])
def MuscleGroup(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        object_serializer = serializers.MuscleGroupSerializer(data=data)
        if object_serializer.is_valid():
            object_serializer.save()
            return JsonResponse(object_serializer.data, status=status.HTTP_200_OK)
        return JsonResponse({'message': 'Muscle group with the same name already exists!'}, status=status.HTTP_200_OK)
    elif request.method == 'GET':
        all_data = models.MuscleGroup.objects.all()
        object_serializer = serializers.MuscleGroupSerializer(
            all_data, many=True)
        return JsonResponse(object_serializer.data, safe=False)


# @api_view(['GET', 'POST', 'DELETE'])
# def MuscleGroup(request):
    # if request.method == 'GET':
    #     Signup = models.Signup.objects.all()

    #     plan = request.query_params.get('plan', None)
    #     if plan is not None:
    #         Signup = Signup.filter(plan=plan)

    #     signup_serializer = serializers.SignupSerializer(Signup, many=True)
    #     return JsonResponse(signup_serializer.data, safe=False)
    #     # 'safe=False' for objects serialization

    # elif request.method == 'POST':
    #     user_data = JSONParser().parse(request)
    #     user_data["password"] = make_password(user_data["password"])
    #     if user_data["plan"] == "basic":
    #         user_data["credits"] = 50
    #     elif user_data["plan"] == "advanced":
    #         user_data["credits"] = 75
    #     elif user_data["plan"] == "professional":
    #         user_data["credits"] = 100
    #     signup_serializer = serializers.SignupSerializer(data=user_data)
    #     if signup_serializer.is_valid():
    #         signup_serializer.save()
    #         return JsonResponse(signup_serializer.data, status=status.HTTP_200_OK)
    #     return JsonResponse({'message': 'exists'}, status=status.HTTP_200_OK)

    # elif request.method == 'DELETE':
    #     count = models.Signup.objects.all().delete()
    #     return JsonResponse({'message': 'alldeleted'}, status=status.HTTP_200_OK)
    # pass
