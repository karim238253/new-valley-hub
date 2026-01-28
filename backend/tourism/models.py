from django.db import models
from core.models import BaseLocationModel

class Attraction(BaseLocationModel):
    TYPE_CHOICES = [
        ('natural', 'Natural Reserve'),
        ('historical', 'Historical Site'),
        ('cultural', 'Cultural Center'),
    ]
    
    attraction_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    visit_duration_minutes = models.PositiveIntegerField(help_text="Average time spent in minutes")
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    ticket_price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)

    def __str__(self):
        return self.name

class DigitalArtifact(models.Model):
    """
    Represents items in the Digital Museum.
    Can be standalone or linked to a specific physical attraction.
    """
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='artifacts/', blank=True, null=True)
    image_url = models.URLField(blank=True, help_text="External URL for image (optional)")
    
    # For 3D viewing or virtual tours
    model_3d_file = models.FileField(upload_to='3d_models/', blank=True, null=True)
    virtual_tour_url = models.URLField(blank=True, help_text="Link to 360 view if hosted externally")
    
    related_attraction = models.ForeignKey(
        Attraction, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='artifacts'
    )

    @property
    def final_image_src(self):
        if self.image:
            return self.image.url
        return self.image_url

    def __str__(self):
        return self.name

class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, blank=True, null=True)
    photo = models.ImageField(upload_to='team_photos/', blank=True, null=True)
    photo_url = models.URLField(blank=True, null=True)
    profile_url = models.URLField(blank=True, null=True)

    @property
    def final_photo(self):
        if self.photo_url:
            return self.photo_url
        if self.photo:
            return self.photo.url
        return None


    def __str__(self):
        return self.name

class GovernorProfile(models.Model):
    name = models.CharField(max_length=200, default="اللواء أ.ح / محمد سالمان الزملوط")
    title = models.CharField(max_length=200, default="محافظ الوادي الجديد")
    photo = models.ImageField(upload_to='governor_photos/', blank=True, null=True)
    welcome_heading = models.CharField(max_length=200, default="كلمة السيد المحافظ")
    welcome_message = models.TextField(default="يسعدني ويشرفني أن أكون بين أهلي في محافظة الوادي الجديد فالمواطن أول اهتماماتي وأقسمت اليمين لأرعى مصالحه وأن أحافظ عليه. أما تعظيم الموارد المتاحة بالمحافظة وترشيد الاستهلاك والتواصل بين جميع الجهات الإدارية لتوفير الكثير من الجهد والوقت وضرورة حسن معاملة المواطنين والعمل بروح الفريق والالتزام الكامل بتوفير الخدمات من أساسيات العمل بالمحافظة.")
    career_highlights = models.TextField(default="تاريخ التخرج: الكلية الحربية 1/4/1980.\nتولى الوظائف القيادية في سلاح المشاة حتى قائد الفرقة 16 مشاة.\nمساعد قائد المنطقة الشمالية العسكرية.\nرئيس أركان الجيش الثاني الميداني.\nرئيس أركان المنطقة المركزية العسكرية.\nقائد المنطقة الشمالية العسكرية.\nرئيس هيئة البحوث العسكرية.\nالأوسمة: ميدالية الخدمة الطويلة، نوط الواجب العسكري، نوط الخدمة الممتازة.")

    def save(self, *args, **kwargs):
        self.pk = 1
        super(GovernorProfile, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return self.name
