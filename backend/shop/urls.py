from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CommentViewSet

router = DefaultRouter(trailing_slash=True)  # Set trailing_slash to False
router.register('products', ProductViewSet)
router.register('comments', CommentViewSet)

urlpatterns = router.urls  # Simplify URL patterns
