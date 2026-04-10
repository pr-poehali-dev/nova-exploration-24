import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки на бесплатный замер на почту студии"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите имя и телефон'})
        }

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    from_email = '89231072101@mail.ru'
    to_email = '89231072101@mail.ru'

    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = f'Новая заявка на замер — {name}'

    text = f"""Новая заявка на бесплатный замер!

Имя: {name}
Телефон: {phone}
Комментарий: {comment or 'не указан'}
"""

    msg.attach(MIMEText(text, 'plain', 'utf-8'))

    server = smtplib.SMTP_SSL('smtp.mail.ru', 465)
    server.login(from_email, smtp_password)
    server.sendmail(from_email, to_email, msg.as_string())
    server.quit()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
