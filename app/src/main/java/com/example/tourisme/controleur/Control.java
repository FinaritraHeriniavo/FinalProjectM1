package com.example.tourisme.controleur;

import com.example.tourisme.modele.User;

public final class Control {

    private static Control instance = null;
    private User user;
    private Control(){
        super();
    }

    public static final Control getInstance() {
        if (Control.instance == null) {
            Control.instance = new Control();
        }
        return Control.instance;
    }

    public void creerUser(String email, String password) {
        user = new User(email, password);
    }
}
