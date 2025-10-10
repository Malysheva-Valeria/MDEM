"""
Модуль для валідації медичних даних

Містить функції для перевірки коректності медичних даних,
що вводяться пацієнтами та лікарями
"""

import re
from datetime import date, datetime
from typing import List, Optional
from fastapi import HTTPException, status

# Валідація груп крові

VALID_BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]


def validate_blood_type(blood_type: str) -> bool:
    """
    Перевірка коректності групи крові

    Args:
        blood_type: Група крові для перевірки

    Returns:
        True якщо група крові валідна

    Raises:
        ValueError: якщо група крові невалідна
    """
    if blood_type not in VALID_BLOOD_TYPES:
        raise ValueError(
            f"Невірна група крові: {blood_type}. "
            f"Дозволені значення: {', '.join(VALID_BLOOD_TYPES)}"
        )
    return True


# Валідація віку

def validate_age(date_of_birth: date, min_age: int = 0, max_age: int = 150) -> int:
    """
    Перевірка коректності віку на основі дати народження

    Args:
        date_of_birth: Дата народження
        min_age: Мінімальний допустимий вік
        max_age: Максимальний допустимий вік

    Returns:
        Вік в роках

    Raises:
        ValueError: якщо вік не входить у допустимий діапазон
    """
    today = date.today()

    # Розрахунок віку
    age = today.year - date_of_birth.year
    if (today.month, today.day) < (date_of_birth.month, date_of_birth.day):
        age -= 1

    # Перевірка діапазону
    if age < min_age:
        raise ValueError(f"Вік повинен бути не менше {min_age} років")

    if age > max_age:
        raise ValueError(f"Невірна дата народження (вік більше {max_age} років)")

    if date_of_birth > today:
        raise ValueError("Дата народження не може бути в майбутньому")

    return age


# Валідація телефону

def validate_phone_number(phone: str) -> str:
    """
    Валідація та нормалізація номера телефону

    Підтримує формати:
    - +380501234567
    - 0501234567
    - (050) 123-45-67

    Args:
        phone: Номер телефону

    Returns:
        Нормалізований номер телефону

    Raises:
        ValueError: якщо номер невалідний
    """
    # Видаляємо всі нецифрові символи крім +
    cleaned = re.sub(r'[^\d+]', '', phone)

    # Перевірка довжини
    digits_only = cleaned.replace('+', '')

    if len(digits_only) < 10:
        raise ValueError("Номер телефону занадто короткий (мінімум 10 цифр)")

    if len(digits_only) > 15:
        raise ValueError("Номер телефону занадто довгий (максимум 15 цифр)")

    # Нормалізація для українських номерів
    if digits_only.startswith('380'):
        return f"+{digits_only}"
    elif digits_only.startswith('0') and len(digits_only) == 10:
        return f"+38{digits_only}"

    return cleaned if cleaned.startswith('+') else f"+{cleaned}"


# Валідація медичних даних

def validate_medication_name(name: str) -> bool:
    """
    Перевірка назви медикаменту

    Args:
        name: Назва медикаменту

    Returns:
        True якщо назва валідна

    Raises:
        ValueError: якщо назва невалідна
    """
    if not name or len(name.strip()) < 2:
        raise ValueError("Назва медикаменту повинна містити мінімум 2 символи")

    if len(name) > 200:
        raise ValueError("Назва медикаменту занадто довга (максимум 200 символів)")

    # Перевірка на небезпечні символи
    if re.search(r'[<>{}[\]\\]', name):
        raise ValueError("Назва медикаменту містить недозволені символи")

    return True


def validate_allergy(allergy: str) -> bool:
    """
    Перевірка опису алергії

    Args:
        allergy: Опис алергії

    Returns:
        True якщо опис валідний

    Raises:
        ValueError: якщо опис невалідний
    """
    if not allergy or len(allergy.strip()) < 2:
        raise ValueError("Опис алергії повинен містити мінімум 2 символи")

    if len(allergy) > 200:
        raise ValueError("Опис алергії занадто довгий (максимум 200 символів)")

    return True


def validate_disease(disease: str) -> bool:
    """
    Перевірка назви захворювання

    Args:
        disease: Назва захворювання

    Returns:
        True якщо назва валідна

    Raises:
        ValueError: якщо назва невалідна
    """
    if not disease or len(disease.strip()) < 2:
        raise ValueError("Назва захворювання повинна містити мінімум 2 символи")

    if len(disease) > 200:
        raise ValueError("Назва захворювання занадто довга (максимум 200 символів)")

    return True


# Валідація ціни консультації

def validate_consultation_price(price: float, min_price: float = 0, max_price: float = 100000) -> bool:
    """
    Перевірка ціни консультації

    Args:
        price: Ціна консультації
        min_price: Мінімальна ціна
        max_price: Максимальна ціна

    Returns:
        True якщо ціна валідна

    Raises:
        ValueError: якщо ціна невалідна
    """
    if price < min_price:
        raise ValueError(f"Ціна консультації не може бути менше {min_price} грн")

    if price > max_price:
        raise ValueError(f"Ціна консультації не може перевищувати {max_price} грн")

    # Перевірка на розумну точність (максимум 2 знаки після коми)
    if round(price, 2) != price:
        raise ValueError("Ціна може мати максимум 2 знаки після коми")

    return True


# Валідація номера ліцензії

def validate_license_number(license_number: str) -> bool:
    """
    Перевірка номеру медичної ліцензії

    Args:
        license_number: Номер ліцензії

    Returns:
        True якщо номер валідний

    Raises:
        ValueError: якщо номер невалідний
    """
    if not license_number or len(license_number.strip()) < 5:
        raise ValueError("Номер ліцензії повинен містити мінімум 5 символів")

    if len(license_number) > 50:
        raise ValueError("Номер ліцензії занадто довгий (максимум 50 символів)")

    # Базова перевірка формату (можна розширити під конкретну країну)
    if not re.match(r'^[A-Z0-9\-]+$', license_number.upper()):
        raise ValueError(
            "Номер ліцензії може містити тільки великі латинські літери, цифри та дефіс"
        )

    return True


# Валідація рейтингу

def validate_rating(rating: float, min_rating: float = 0, max_rating: float = 5) -> bool:
    """
    Перевірка рейтингу

    Args:
        rating: Рейтинг
        min_rating: Мінімальний рейтинг
        max_rating: Максимальний рейтинг

    Returns:
        True якщо рейтинг валідний

    Raises:
        ValueError: якщо рейтинг не валідний
    """
    if rating < min_rating or rating > max_rating:
        raise ValueError(f"Рейтинг повинен бути від {min_rating} до {max_rating}")

    return True


# Валідація графіку роботи

def validate_work_schedule(schedule: dict) -> bool:
    """
    Перевірка графіку роботи

    Args:
        schedule: Словник з графіком роботи

    Returns:
        True якщо графік валідний

    Raises:
        ValueError: якщо графік невалідний
    """
    valid_days = {'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'}

    if not schedule:
        return True  # Порожній графік допустимий

    # Перевірка днів тижня
    for day in schedule.keys():
        if day not in valid_days:
            raise ValueError(f"Невірний день тижня: {day}")

        # Перевірка структури дня
        day_schedule = schedule[day]
        if not isinstance(day_schedule, dict):
            raise ValueError(f"Графік для {day} повинен бути словником")

        if 'start' not in day_schedule or 'end' not in day_schedule:
            raise ValueError(f"Графік для {day} повинен містити 'start' та 'end'")

        # Валідація часу
        try:
            start_time = datetime.strptime(day_schedule['start'], '%H:%M').time()
            end_time = datetime.strptime(day_schedule['end'], '%H:%M').time()
        except ValueError:
            raise ValueError(f"Невірний формат часу для {day}. Очікується HH:MM")

        # Перевірка що час закінчення пізніше за час початку
        if end_time <= start_time:
            raise ValueError(
                f"Час закінчення роботи ({day_schedule['end']}) "
                f"повинен бути пізніше за час початку ({day_schedule['start']}) для {day}"
            )

    return True


# Допоміжні функції

def sanitize_medical_text(text: str) -> str:
    """
    Очищення медичного тексту від небезпечних символів

    Args:
        text: Текст для очищення

    Returns:
        Очищений текст
    """
    if not text:
        return ""

    # Видаляємо HTML теги
    text = re.sub(r'<[^>]+>', '', text)

    # Видаляємо потенційно небезпечні символи
    text = re.sub(r'[<>{}[\]\\]', '', text)

    # Обрізаємо зайві пробіли
    text = ' '.join(text.split())

    return text.strip()


# Функції для HTTPException

def raise_validation_error(detail: str):
    """
    Викинути HTTP exception для помилки валідації

    Args:
        detail: Опис помилки
    """
    raise HTTPException(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        detail=detail
    )