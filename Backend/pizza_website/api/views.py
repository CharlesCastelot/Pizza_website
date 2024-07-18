from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, PizzaSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Pizza, Comments


# TO-DO:
# 1) Get the pizza selected by the URL and retrun that pizza info and the comments || class OnePizzaList(generics.ListAPIView) & class CommentList(generics.ListAPIView)
# 3) Create a Post comment, so that users can add their own comments on pizzas || class CommentCreate(generics.CreateAPIView)
# 
# 2) Create a Post Pizzas so that users can add their own pizzas || class PizzaCreate(generics.CreateAPIView)
# DONE      4) Create a Get to Get Pizzas Info and return it in JSON  || class PizzaList(generics.ListAPIView) 


#1 DONE
class OnePizzaList(generics.ListAPIView):
    serializer_class = PizzaSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pizza_id = self.kwargs['id']
        return Pizza.objects.filter(id=pizza_id)

class CommentList(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        pizza_id = self.kwargs['id']
        return Comments.objects.filter(pizza_id=pizza_id)

#2 DONE
class PizzaCreate(generics.CreateAPIView):
    serializer_class = PizzaSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save()


#3 DONE
class CommentCreate(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        pizza_id = self.kwargs['pizza_id']
        pizza = Pizza.objects.get(id=pizza_id)
        serializer.save(pizza=pizza)


#4 DONE
class Pizzas(generics.ListAPIView):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
    permission_classes = [AllowAny]







class PizzaListCreate(generics.ListCreateAPIView):
    serializer_class = PizzaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Pizza.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class PizzaDelete(generics.DestroyAPIView):
    serializer_class = PizzaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Pizza.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]