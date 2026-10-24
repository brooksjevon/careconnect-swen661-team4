import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'package:careconnect_flutter/app/careconnect_app.dart';
import 'package:careconnect_flutter/features/appointments/screens/appointment_preparation_screen.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets(
    'User can navigate to appointments and complete appointment preparation',
    (WidgetTester tester) async {
      await tester.pumpWidget(const CareConnectApp());
      await tester.pumpAndSettle();

      // CareConnect uses a NavigationBar on phone-sized displays and a
      // NavigationRail on wider tablet/desktop displays.
      final navigationBar = find.byType(NavigationBar);
      final navigationRail = find.byType(NavigationRail);

      expect(
        navigationBar.evaluate().isNotEmpty ||
            navigationRail.evaluate().isNotEmpty,
        isTrue,
      );

      // Navigate to Appointments using whichever responsive navigation
      // layout is currently displayed.
      final navigation = navigationBar.evaluate().isNotEmpty
          ? navigationBar
          : navigationRail;

      final appointmentsDestination = find.descendant(
        of: navigation,
        matching: find.text('Appointments'),
      );

      expect(appointmentsDestination, findsOneWidget);

      await tester.tap(appointmentsDestination);
      await tester.pumpAndSettle();

      expect(find.text('Your upcoming healthcare visits.'), findsOneWidget);

      // Open appointment preparation.
      final prepareButton = find.text('Prepare for Appointment');
      expect(prepareButton, findsOneWidget);

      await tester.tap(prepareButton);
      await tester.pumpAndSettle();

      expect(find.byType(AppointmentPreparationScreen), findsOneWidget);

      expect(find.text('Appointment Preparation'), findsOneWidget);

      // Find the scrollable appointment preparation content.
      final scrollable = find
          .descendant(
            of: find.byType(AppointmentPreparationScreen),
            matching: find.byType(Scrollable),
          )
          .first;

      // Scroll to the completion action.
      final completeButton = find.text('Mark Preparation Complete');

      await tester.dragUntilVisible(
        completeButton,
        scrollable,
        const Offset(0, -250),
      );

      await tester.pumpAndSettle();

      expect(completeButton, findsOneWidget);

      // Complete appointment preparation.
      await tester.tap(completeButton);
      await tester.pumpAndSettle();

      // Verify the completed state.
      expect(find.text('Preparation: Complete'), findsOneWidget);

      expect(find.text('Review Preparation'), findsOneWidget);
    },
  );
}
