
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'new_valley_hub.settings')
django.setup()

from tourism.models import GovernorProfile, TeamMember

def seed_governor():
    if GovernorProfile.objects.count() == 0:
        print("Creating Governor Profile...")
        # load() automatically creates if not exists based on our classmethod logic
        # But our load() method in models.py uses get_or_create(pk=1)
        # However, the defaults are in the model fields, so just calling load() should work if defaults are respected.
        # Let's be explicit to be safe.
        GovernorProfile.objects.create(
            pk=1,
            name="اللواء أ.ح / محمد سالمان الزملوط",
            title="محافظ الوادي الجديد",
            welcome_heading="كلمة السيد المحافظ",
            welcome_message="يسعدني ويشرفني أن أكون بين أهلي في محافظة الوادي الجديد فالمواطن أول اهتماماتي وأقسمت اليمين لأرعى مصالحه وأن أحافظ عليه. أما تعظيم الموارد المتاحة بالمحافظة وترشيد الاستهلاك والتواصل بين جميع الجهات الإدارية لتوفير الكثير من الجهد والوقت وضرورة حسن معاملة المواطنين والعمل بروح الفريق والالتزام الكامل بتوفير الخدمات من أساسيات العمل بالمحافظة.",
            career_highlights="تاريخ التخرج: الكلية الحربية 1/4/1980.\nتولى الوظائف القيادية في سلاح المشاة حتى قائد الفرقة 16 مشاة.\nمساعد قائد المنطقة الشمالية العسكرية.\nرئيس أركان الجيش الثاني الميداني.\nرئيس أركان المنطقة المركزية العسكرية.\nقائد المنطقة الشمالية العسكرية.\nرئيس هيئة البحوث العسكرية.\nالأوسمة: ميدالية الخدمة الطويلة، نوط الواجب العسكري، نوط الخدمة الممتازة."
        )
        print("Governor Profile Created.")
    else:
        print("Governor Profile already exists.")

def seed_team():
    members = [
        {
            "name": "Sarah Ahmed",
            "role": "Lead Developer",
            "profile_url": "https://github.com/sarah-ahmed"
        },
        {
            "name": "Mohamed Ali",
            "role": "UI/UX Designer",
            "profile_url": "https://linkedin.com/in/mohamedali"
        },
        {
            "name": "Khaled Omar",
            "role": "Project Manager",
            "profile_url": "https://linktr.ee/khaledomar"
        }
    ]
    
    for member in members:
        if not TeamMember.objects.filter(name=member["name"]).exists():
            TeamMember.objects.create(**member)
            print(f"Created Team Member: {member['name']}")
        else:
            print(f"Team Member {member['name']} already exists.")

if __name__ == '__main__':
    seed_governor()
    seed_team()
    print("Seeding Complete!")
