package com.example.envirometrics;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class LoginActivity extends AppCompatActivity {

    private String mEmail;
    private String mPassword;
    private Button btnIniciarSesion;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);

        btnIniciarSesion = findViewById(R.id.btnLogin);

        btnIniciarSesion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent MainIntent = new Intent(LoginActivity.this, MainActivity.class);
                startActivity(MainIntent);
            }
        });

    }

    public void linkRegistrarse (View view){
        Intent MainIntent = new Intent(LoginActivity.this, RegistroActivity.class);
        startActivity(MainIntent);
    }


}