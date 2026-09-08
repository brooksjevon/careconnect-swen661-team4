import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:careconnect_flutter/app/careconnect_app.dart';

void main() {
  Future<void> setPhoneSize(WidgetTester tester) async {
    tester.view.physicalSize = const Size(390, 844);

    tester.view.devicePixelRatio = 1.0;

    addTearDown(tester.view.resetPhysicalSize);

    addTearDown(tester.view.resetDevicePixelRatio);
  }

  Future<void> openMedications(WidgetTester tester) async {
    await setPhoneSize(tester);

    await tester.pumpWidget(const CareConnectApp());

    await tester.pumpAndSettle();

    final navigationBar = find.byType(NavigationBar);

    expect(navigationBar, findsOneWidget);

    final medicationsDestination = find.descendant(
      of: navigationBar,
      matching: find.text('Medications'),
    );

    expect(medicationsDestination, findsOneWidget);

    await tester.tap(medicationsDestination);

    await tester.pumpAndSettle();
  }

  testWidgets('Medication list displays plain-language information', (
    WidgetTester tester,
  ) async {
    await openMedications(tester);

    expect(find.text('Your current medication schedule.'), findsOneWidget);

    expect(find.text('Lisinopril'), findsOneWidget);

    expect(find.text('Amlodipine'), findsOneWidget);

    expect(find.text('10 mg'), findsOneWidget);

    expect(find.text('5 mg'), findsOneWidget);

    expect(find.text('View Details'), findsNWidgets(2));
  });

  testWidgets('User can open medication details', (WidgetTester tester) async {
    await openMedications(tester);

    await tester.tap(find.text('View Details').first);

    await tester.pumpAndSettle();

    expect(find.text('Medication Details'), findsOneWidget);

    expect(find.text('Lisinopril'), findsOneWidget);

    expect(find.text('10 mg'), findsOneWidget);

    expect(find.text('Take'), findsOneWidget);

    expect(find.text('1 tablet'), findsOneWidget);

    expect(find.text('When'), findsOneWidget);

    expect(find.text('Once each day'), findsOneWidget);

    expect(find.text('Used for'), findsOneWidget);

    expect(find.text('High blood pressure'), findsOneWidget);

    expect(find.text('Read Aloud'), findsOneWidget);

    expect(find.text('Mark as Taken'), findsOneWidget);
  });

  testWidgets('User can mark medication as taken', (WidgetTester tester) async {
    await openMedications(tester);

    await tester.tap(find.text('View Details').first);

    await tester.pumpAndSettle();

    expect(find.text('Not taken yet'), findsOneWidget);

    await tester.tap(find.text('Mark as Taken'));

    await tester.pumpAndSettle();

    expect(find.text('Taken today'), findsOneWidget);

    expect(find.text('Taken Today'), findsOneWidget);

    await tester.pageBack();

    await tester.pumpAndSettle();

    expect(find.text('Taken today'), findsOneWidget);
  });
}
