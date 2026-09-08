import 'package:flutter/material.dart';

enum CareConnectRole { patient, caregiver, provider }

extension CareConnectRoleLabel on CareConnectRole {
  String get label {
    switch (this) {
      case CareConnectRole.patient:
        return 'Patient';
      case CareConnectRole.caregiver:
        return 'Caregiver';
      case CareConnectRole.provider:
        return 'Provider';
    }
  }

  IconData get icon {
    switch (this) {
      case CareConnectRole.patient:
        return Icons.person_outline;
      case CareConnectRole.caregiver:
        return Icons.volunteer_activism_outlined;
      case CareConnectRole.provider:
        return Icons.medical_services_outlined;
    }
  }
}

class SignInScreen extends StatefulWidget {
  final ValueChanged<CareConnectRole> onSignIn;

  const SignInScreen({super.key, required this.onSignIn});

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  final _formKey = GlobalKey<FormState>();

  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  CareConnectRole _selectedRole = CareConnectRole.patient;

  bool _hidePassword = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _signIn() {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    widget.onSignIn(_selectedRole);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 520),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Icon(
                      Icons.health_and_safety_outlined,
                      size: 64,
                      color: theme.colorScheme.primary,
                    ),

                    const SizedBox(height: 16),

                    Text(
                      'CareConnect',
                      textAlign: TextAlign.center,
                      style: theme.textTheme.headlineLarge,
                    ),

                    const SizedBox(height: 8),

                    Text(
                      'Sign in to continue',
                      textAlign: TextAlign.center,
                      style: theme.textTheme.bodyLarge,
                    ),

                    const SizedBox(height: 32),

                    Text('I am a...', style: theme.textTheme.headlineMedium),

                    const SizedBox(height: 12),

                    ...CareConnectRole.values.map(
                      (role) => Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: _RoleCard(
                          role: role,
                          selected: role == _selectedRole,
                          onTap: () {
                            setState(() {
                              _selectedRole = role;
                            });
                          },
                        ),
                      ),
                    ),

                    const SizedBox(height: 20),

                    TextFormField(
                      controller: _emailController,
                      keyboardType: TextInputType.emailAddress,
                      decoration: const InputDecoration(
                        labelText: 'Email',
                        hintText: 'Enter your email',
                        prefixIcon: Icon(Icons.email_outlined),
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value == null || value.trim().isEmpty) {
                          return 'Enter your email.';
                        }

                        return null;
                      },
                    ),

                    const SizedBox(height: 16),

                    TextFormField(
                      controller: _passwordController,
                      obscureText: _hidePassword,
                      decoration: InputDecoration(
                        labelText: 'Password',
                        hintText: 'Enter your password',
                        prefixIcon: const Icon(Icons.lock_outline),
                        suffixIcon: IconButton(
                          tooltip: _hidePassword
                              ? 'Show password'
                              : 'Hide password',
                          onPressed: () {
                            setState(() {
                              _hidePassword = !_hidePassword;
                            });
                          },
                          icon: Icon(
                            _hidePassword
                                ? Icons.visibility_outlined
                                : Icons.visibility_off_outlined,
                          ),
                        ),
                        border: const OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Enter your password.';
                        }

                        return null;
                      },
                    ),

                    const SizedBox(height: 24),

                    SizedBox(
                      height: 52,
                      child: FilledButton.icon(
                        onPressed: _signIn,
                        icon: const Icon(Icons.login_outlined),
                        label: Text('Sign In as ${_selectedRole.label}'),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _RoleCard extends StatelessWidget {
  final CareConnectRole role;
  final bool selected;
  final VoidCallback onTap;

  const _RoleCard({
    required this.role,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Semantics(
      button: true,
      selected: selected,
      label: '${role.label} sign-in option',
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Container(
          constraints: const BoxConstraints(minHeight: 72),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            color: selected
                ? theme.colorScheme.primaryContainer
                : theme.colorScheme.surface,
            border: Border.all(
              color: selected
                  ? theme.colorScheme.primary
                  : theme.colorScheme.outlineVariant,
              width: selected ? 2 : 1,
            ),
          ),
          child: Row(
            children: [
              Icon(role.icon, size: 30, color: theme.colorScheme.primary),

              const SizedBox(width: 16),

              Expanded(
                child: Text(role.label, style: theme.textTheme.titleLarge),
              ),

              Icon(
                selected ? Icons.check_circle : Icons.circle_outlined,
                color: theme.colorScheme.primary,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
