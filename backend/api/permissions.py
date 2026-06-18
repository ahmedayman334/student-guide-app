from rest_framework import permissions

class IsLeaderForCohortOrReadOnly(permissions.BasePermission):
    """
    Custom permission:
    - Anyone can Read (GET).
    - Only a 'Leader' can Create (POST).
    - Only a 'Leader' of the SAME target_level can Update/Delete (PUT/PATCH/DELETE).
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
            
        if request.user and request.user.is_authenticated:
            try:
                return request.user.student_profile.role == 'leader'
            except Exception:
                return False
        return False

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
            
        try:
            profile = request.user.student_profile
            is_leader = profile.role == 'leader'
            is_same_level = obj.target_level == profile.current_level
            
            return is_leader and is_same_level
        except Exception:
            return False