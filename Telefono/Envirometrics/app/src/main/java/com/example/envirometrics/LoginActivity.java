package com.example.envirometrics;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class LoginActivity extends AppCompatActivity {

    private String email;
    private String password;
    private Button btnIniciarSesion;
    private TextView textoError;
    public LogicaFake laLogica;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);

        laLogica = new LogicaFake(this);
        btnIniciarSesion = findViewById(R.id.btnLog);
        textoError = findViewById(R.id.textoError);
        iniciarSesion();

    }

    public void iniciarSesion (){
        btnIniciarSesion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                EditText emailEditText = findViewById(R.id.email);
                email = emailEditText.getText().toString();

                EditText passwordEditText = findViewById(R.id.password);
                password = passwordEditText.getText().toString();

                laLogica.iniciarSesion( email, password,
                        new CallbackPet () {
                            public void callbackCall(String respuesta){
                                if(respuesta.equals("true")){
                                    Intent i = new Intent(LoginActivity.this, MainActivity.class);
                                    startActivity(i);
                                }else {
                                    textoError.setText("Email o contraseña incorrectos");
                                }
                            }
                        }
                );

            }
        });
    }

    public void linkRegistrarse (View view){
        Intent i = new Intent(LoginActivity.this, RegistroActivity.class);
        startActivity(i);
    }


}