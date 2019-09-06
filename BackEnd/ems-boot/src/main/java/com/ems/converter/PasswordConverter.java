package com.ems.converter;

import java.security.Key;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.AttributeConverter;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

@SuppressWarnings("restriction")
public class PasswordConverter implements AttributeConverter<String, String> {

	private static final String ALGORITHM = "AES";
    private static final String KEY = "1Hbfh667adfDEJ78";

	@Override
	public String convertToDatabaseColumn(String plainPassword) {
		Key key;
		Cipher cipher;
		try {
			key = generateKey();
			cipher = Cipher.getInstance(PasswordConverter.ALGORITHM);
	        cipher.init(Cipher.ENCRYPT_MODE, key);
	        byte [] encryptedByteValue = cipher.doFinal(plainPassword.getBytes("utf-8"));
	        return new BASE64Encoder().encode(encryptedByteValue);
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public String convertToEntityAttribute(String encryptedPassword) {
		Key key;
		Cipher cipher;
		try {
			key = generateKey();
			cipher = Cipher.getInstance(PasswordConverter.ALGORITHM);
	        cipher.init(Cipher.DECRYPT_MODE, key);
			byte [] decryptedValue64 = new BASE64Decoder().decodeBuffer(encryptedPassword);
	        byte [] decryptedByteValue = cipher.doFinal(decryptedValue64);
	        return new String(decryptedByteValue,"utf-8");
		} catch (Exception e) {
			return null;
		}
	}
	
	private static Key generateKey() throws Exception {
        return new SecretKeySpec(PasswordConverter.KEY.getBytes(),PasswordConverter.ALGORITHM);
    }
}