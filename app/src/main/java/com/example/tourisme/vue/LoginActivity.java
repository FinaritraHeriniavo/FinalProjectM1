package com.example.tourisme.vue;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.tourisme.R;
import com.example.tourisme.controleur.Control;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        init();
        this.control = Control.getInstance();

        button = (Button) findViewById(R.id.btnLink);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(LoginActivity.this, InscriptionActivity.class);
                startActivity(intent);
            }
        });
    }

    //propriétés
    public Button button;
    private EditText txtEmail;
    private EditText txtPassword;
    private Control control;
    private void init() {
        txtEmail = findViewById(R.id.txtEmail);
        txtPassword = findViewById(R.id.txtPassword);
        connect();
    }

    private void connect() {
        findViewById(R.id.btnConnect).setOnClickListener(new Button.OnClickListener() {
            public void onClick(View v) {
                Toast.makeText(LoginActivity.this, "Succès", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                startActivity(intent);
            }
        });
    }
}