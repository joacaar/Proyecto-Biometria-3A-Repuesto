package com.example.envirometrics;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class RegistroActivity extends Activity {

    private String email;
    private String telefono;
    private String password;
    private String confirmarPassword;
    private Button btnRegistrarme;
    private TextView textoError;

    public LogicaFake laLogica;



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.registro);

        btnRegistrarme = findViewById(R.id.btnRegistrarse);
        textoError = findViewById(R.id.textoError2);
        laLogica = new LogicaFake(this);
        registrarse();

    }

    public void registrarse (){

        btnRegistrarme.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                EditText emailEditText = findViewById(R.id.editTextEmail);
                email = emailEditText.getText().toString();

                EditText telefonoEditText = findViewById(R.id.editTextTelefono);
                telefono = telefonoEditText.getText().toString();

                EditText passwordEditText1 = findViewById(R.id.editTextPassword1);
                password = passwordEditText1.getText().toString();

                EditText passwordEditText2 = findViewById(R.id.editTextPassword2);
                confirmarPassword = passwordEditText2.getText().toString();

                //Compruebo que todos los campos estan completos
                if(email.equals("")||telefono.equals("")||password.equals("")||confirmarPassword.equals("")){
                    textoError.setText("Complete todos los campos");
                }
                else {
                    //Compruebo si es un email
                    if(!email.contains("@")){
                        textoError.setText("Email incorrecto");
                    }
                    //Compruebo que las contraseñas coinciden
                    else if (!password.equals(confirmarPassword)) {
                        textoError.setText("Las contraseñas no coinciden");
                    }
                    //Todo correcto
                    else {

                        //Creo un usuario y se lo envio al servidor para que lo guarde en la bd
                        Usuario nuevoUsuario = new Usuario(email, telefono, password);

                        laLogica.darAltaUsuario( nuevoUsuario,
                                new CallbackPet () {
                                    public void callbackCall(String respuesta){
                                        if(respuesta.equals("OK")){
                                            Intent i = new Intent(RegistroActivity.this, MainActivity.class);
                                            startActivity(i);
                                        }else {
                                            textoError.setText("Usuario no registrado");
                                        }

                                    }

                                }

                        );
                    }
                }//else

            }
        });
    }

    public void linkIniciarSesion (View view){
        Intent MainIntent = new Intent(RegistroActivity.this, LoginActivity.class);
        startActivity(MainIntent);
    }
}
