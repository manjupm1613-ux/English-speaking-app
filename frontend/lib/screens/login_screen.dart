// login_screen.dart

import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  bool _isLoginMode = true;
  String _email = '';
  String _password = '';
  bool _isLoading = false;
  String _errorMessage = '';

  void _toggleMode() {
    setState(() {
      _isLoginMode = !_isLoginMode;
    });
  }

  void _submit() {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
        _errorMessage = '';
      });
      // Perform login or signup based on _isLoginMode
      // Simulate a network call
      Future.delayed(Duration(seconds: 2), () {
        setState(() {
          _isLoading = false;
        });
        // If error occurs:
        // setState(() {
        //   _errorMessage = 'Invalid credentials';
        // });
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_isLoginMode ? 'Login' : 'Sign Up'),
        actions: <Widget>[
          TextButton(
            onPressed: _toggleMode,
            child: Text(
              _isLoginMode ? 'Switch to Sign Up' : 'Switch to Login',
              style: TextStyle(color: Colors.white),
            ),
          )
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: <Widget>[
              TextFormField(
                decoration: InputDecoration(labelText: 'Email'),
                validator: (value) {
                  if (value == null || !value.contains('@')) {
                    return 'Enter a valid email';
                  }
                  return null;
                },
                onChanged: (value) {
                  _email = value;
                },
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Password'),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.length < 6) {
                    return 'Password must be at least 6 characters';
                  }
                  return null;
                },
                onChanged: (value) {
                  _password = value;
                },
              ),
              SizedBox(height: 20),
              if (_errorMessage.isNotEmpty)
                Text(
                  _errorMessage,
                  style: TextStyle(color: Colors.red),
                ),
              if (_isLoading)
                CircularProgressIndicator(),
              if (!_isLoading)
                ElevatedButton(
                  onPressed: _submit,
                  child: Text(_isLoginMode ? 'Login' : 'Sign Up'),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
