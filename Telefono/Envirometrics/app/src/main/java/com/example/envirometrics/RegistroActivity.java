package com.example.envirometrics;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class RegistroActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.registro);

    }

    public void linkIniciarSesion (View view){
        Intent MainIntent = new Intent(RegistroActivity.this, LoginActivity.class);
        startActivity(MainIntent);
    }
}
