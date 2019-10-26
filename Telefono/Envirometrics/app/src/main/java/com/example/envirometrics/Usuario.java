package com.example.envirometrics;

public class Usuario {

    private String correoElectronico;
    private String telefono;
    private String password;


    public Usuario(String correoElectronico_, String tel_, String password_)
    {
        this.correoElectronico = correoElectronico_;
        this.telefono = tel_;
        this.password = password_;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String tel) {
        this.telefono = tel;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword() {
        this.password = password;
    }
}
