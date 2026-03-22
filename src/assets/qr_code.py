import qrcode

url = "https://www.seehb.org/#/schedule"
img = qrcode.make(url)
img.save("seehb_schedule_qr.png")
print("Saved seehb_schedule_qr.png")