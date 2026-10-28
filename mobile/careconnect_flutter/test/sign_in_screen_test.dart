import 'package:careconnect_flutter/features/auth/screens/sign_in_screen.dart';
import 'package:careconnect_flutter/features/home/widgets/role_dashboard_header.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Sign-in screen shows Patient Caregiver and Provider', (
    tester,
  ) async {
    await tester.pumpWidget(MaterialApp(home: SignInScreen(onSignIn: (_) {})));

    expect(find.text('Patient'), findsOneWidget);
    expect(find.text('Caregiver'), findsOneWidget);
    expect(find.text('Provider'), findsOneWidget);
  });

  testWidgets('Caregiver role can be selected', (tester) async {
    CareConnectRole? selectedRole;

    await tester.pumpWidget(
      MaterialApp(
        home: SignInScreen(
          onSignIn: (role) {
            selectedRole = role;
          },
        ),
      ),
    );

    await tester.tap(find.text('Caregiver'));
    await tester.pump();

    expect(find.text('Sign In as Caregiver'), findsOneWidget);

    final fields = find.byType(TextFormField);

    await tester.enterText(fields.at(0), 'test@careconnect.com');

    await tester.enterText(fields.at(1), 'test123');

    final signInButton = find.widgetWithText(
      FilledButton,
      'Sign In as Caregiver',
    );

    await tester.ensureVisible(signInButton);
    await tester.pumpAndSettle();

    await tester.tap(signInButton);
    await tester.pumpAndSettle();

    expect(selectedRole, CareConnectRole.caregiver);
  });

  testWidgets('Sign-in requires email and password', (tester) async {
    await tester.pumpWidget(MaterialApp(home: SignInScreen(onSignIn: (_) {})));

    final signInButton = find.widgetWithText(
      FilledButton,
      'Sign In as Patient',
    );

    await tester.ensureVisible(signInButton);
    await tester.pumpAndSettle();

    await tester.tap(signInButton);
    await tester.pumpAndSettle();

    expect(find.text('Enter your email.'), findsOneWidget);

    expect(find.text('Enter your password.'), findsOneWidget);
  });

  testWidgets('Switch User calls sign-out action', (tester) async {
    bool signedOut = false;

    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: RoleDashboardHeader(
            role: CareConnectRole.provider,
            onSwitchUser: () {
              signedOut = true;
            },
          ),
        ),
      ),
    );

    expect(find.text('Provider Dashboard'), findsOneWidget);

    final switchButton = find.widgetWithText(OutlinedButton, 'Switch User');

    await tester.ensureVisible(switchButton);
    await tester.pumpAndSettle();

    await tester.tap(switchButton);
    await tester.pumpAndSettle();

    expect(signedOut, isTrue);
  });
}
