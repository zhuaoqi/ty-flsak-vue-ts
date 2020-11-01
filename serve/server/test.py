# coding:utf-8

from Crypto.Cipher import AES
import base64


class AesCrypt():
    def __init__(self, ):
        self.model = AES.MODE_CBC
        self.key = self.add_16('12345678abcdefgh')
        self.iv = '1234567890123456'.encode()
        
    def add_16(self, par):
    	# python3字符串是unicode编码，需要 encode才可以转换成字节型数据
        par = par.encode('utf-8')
        while len(par) % 16 != 0:
            par += b'\x00'
        return par

    def aesdecrypt(self, text):
        # CBC解密需要重新创建一个aes对象

        self.aes = AES.new(self.key, self.model, self.iv)
        text = base64.decodebytes(text.encode('utf-8'))
        self.decrypt_text = self.aes.decrypt(text)
        return self.decrypt_text.decode('utf-8').strip('\0')


if __name__ == '__main__':

    word = 'Zruj8pUD9l4JYngXkyvSVg=='
    model = 'CBC'
    pr = AesCrypt()
    print(pr.aesdecrypt(word))
