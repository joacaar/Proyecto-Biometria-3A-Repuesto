package com.example.envirometrics;

import android.app.Activity;
import android.os.Bundle;


import androidx.appcompat.app.AppCompatActivity;

//Clase para Almacenar los Usuarios
public class LoginActivity extends Activity {

    private  String mEmail;
    private  String mPassword;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

    }


}