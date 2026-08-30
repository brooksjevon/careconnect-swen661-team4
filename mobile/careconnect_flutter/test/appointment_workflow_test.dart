import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:careconnect_flutter/app/careconnect_app.dart';
import 'package:careconnect_flutter/features/appointments/screens/appointment_preparation_screen.dart';

void main() {
  Future<void> setPhoneSize(WidgetTester tester) async {
    tester.view.physicalSize = const Size(390, 844);

    tester.view.devicePixelRatio = 1.0;

    addTearDown(tester.view.resetPhysicalSize);

    addTearDown(tester.view.resetDevicePixelRatio);
  }

  Finder preparationScrollable() {
    return find
        .descendant(
          of: find.byType(AppointmentPreparationScreen),
          matching: find.byType(Scrollable),
        )
        .first;
  }

  Future<void> openAppointments(WidgetTester tester) async {
    await setPhoneSize(tester);

    await tester.pumpWidget(const CareConnectApp());

    await tester.pumpAndSettle();

    final navigationBar = find.byType(NavigationBar);

    expect(navigationBar, findsOneWidget);

    final destination = find.descendant(
      of: navigationBar,
      matching: find.text('Appointments'),
    );

    expect(destination, findsOneWidget);

    await tester.tap(destination);

    await tester.pumpAndSettle();

    expect(find.text('Your upcoming healthcare visits.'), findsOneWidget);
  }

  Future<void> openPreparation(WidgetTester tester) async {
    await openAppointments(tester);

    final prepareButton = find.text('Prepare for Appointment');

    expect(prepareButton, findsOneWidget);

    await tester.tap(prepareButton);

    await tester.pumpAndSettle();

    expect(find.byType(AppointmentPreparationScreen), findsOneWidget);
  }

  testWidgets('User can open appointment preparation', (
    WidgetTester tester,
  ) async {
    await openPreparation(tester);

    expect(find.text('Appointment Preparation'), findsOneWidget);

    expect(find.text('Get Ready for Your Appointment'), findsOneWidget);
  });

  testWidgets('Appointment preparation shows checklist and questions', (
    WidgetTester tester,
  ) async {
    await setPhoneSize(tester);

    await tester.pumpWidget(
      const MaterialApp(home: AppointmentPreparationScreen()),
    );

    await tester.pumpAndSettle();

    final scrollable = preparationScrollable();

    final whatToBring = find.text('What to Bring');

    await tester.dragUntilVisible(
      whatToBring,
      scrollable,
      const Offset(0, -250),
    );

    await tester.pumpAndSettle();

    expect(whatToBring, findsOneWidget);

    final photoId = find.text('Photo ID');

    await tester.dragUntilVisible(photoId, scrollable, const Offset(0, -150));

    await tester.pumpAndSettle();

    expect(photoId, findsOneWidget);

    expect(find.text('Medication list'), findsOneWidget);

    final questionsHeading = find.text('Questions to Ask');

    await tester.dragUntilVisible(
      questionsHeading,
      scrollable,
      const Offset(0, -250),
    );

    await tester.pumpAndSettle();

    expect(questionsHeading, findsOneWidget);

    expect(find.text('Is my blood pressure improving?'), findsOneWidget);

    expect(find.text('Do I need any medication changes?'), findsOneWidget);
  });

  testWidgets('User can complete appointment preparation', (
    WidgetTester tester,
  ) async {
    await openPreparation(tester);

    final scrollable = preparationScrollable();

    final completeButton = find.text('Mark Preparation Complete');

    await tester.dragUntilVisible(
      completeButton,
      scrollable,
      const Offset(0, -250),
    );

    await tester.pumpAndSettle();

    expect(completeButton, findsOneWidget);

    await tester.tap(completeButton);

    await tester.pumpAndSettle();

    expect(find.text('Preparation: Complete'), findsOneWidget);

    expect(find.text('Review Preparation'), findsOneWidget);
  });
}
