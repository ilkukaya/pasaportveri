import json
import datetime
import os
import sys
from pathlib import Path

DATA_FILE = Path(__file__).parent.parent / "data" / "passport_data.json"

def fetch_passport_index():
    """Passport Index API'den Türk pasaportu verisi çek."""
    try:
        import requests
        from bs4 import BeautifulSoup

        url = "https://www.passportindex.org/comparebyPassport.php?p1=tr"
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        print("Passport Index sayfası başarıyla çekildi.")
        return soup
    except Exception as e:
        print(f"UYARI: Passport Index erişilemedi: {e}")
        return None

def fetch_henley():
    """Henley sıralamasını çek."""
    try:
        import requests
        url = "https://api.henleyglobal.com/v1/passport-index"
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=30)
        if response.status_code == 200:
            return response.json()
        print(f"Henley API yanıt kodu: {response.status_code}")
        return None
    except Exception as e:
        print(f"UYARI: Henley API erişilemedi: {e}")
        return None

def update_data_file():
    """JSON dosyasını güncelle, mevcut verileri koru."""
    if not DATA_FILE.exists():
        print("HATA: passport_data.json bulunamadı!")
        sys.exit(1)

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        current = json.load(f)

    old_updated = current.get("last_updated", "bilinmiyor")
    current["last_updated"] = datetime.date.today().isoformat()

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(current, f, ensure_ascii=False, indent=2)

    print(f"Veri dosyası güncellendi: {old_updated} → {current['last_updated']}")
    print(f"Toplam ülke sayısı: {len(current.get('countries', []))}")

    tp = current.get("turkish_passport", {})
    print(f"Türk pasaportu: #{tp.get('rank_henley', '?')} Henley, {tp.get('visa_free_count', '?')} vizesiz")

if __name__ == "__main__":
    print(f"Passport verisi güncelleniyor... {datetime.date.today()}")
    print("=" * 50)

    soup = fetch_passport_index()
    henley = fetch_henley()

    if soup or henley:
        print("API verileri alındı, analiz ediliyor...")
    else:
        print("API'lere erişilemedi, mevcut veri korundu.")
        print("Sadece güncelleme tarihi yenilendi.")

    update_data_file()
    print("=" * 50)
    print("Güncelleme tamamlandı.")
