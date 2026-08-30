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

  testWidgets('CareConnect Home dashboard launches', (
    WidgetTester tester,
  ) async {
    await setPhoneSize(tester);

    await tester.pumpWidget(const CareConnectApp());

    await tester.pumpAndSettle();

    expect(find.text('CareConnect'), findsOneWidget);

    expect(find.text('Good morning, Linda'), findsOneWidget);

    expect(find.text('Next Important Action'), findsOneWidget);

    expect(find.text('Lisinopril'), findsOneWidget);
  });

  testWidgets('Phone navigation displays five destinations', (
    WidgetTester tester,
  ) async {
    await setPhoneSize(tester);

    await tester.pumpWidget(const CareConnectApp());

    await tester.pumpAndSettle();

    final navigationBarFinder = find.byType(NavigationBar);

    expect(navigationBarFinder, findsOneWidget);

    final NavigationBar navigationBar = tester.widget<NavigationBar>(
      navigationBarFinder,
    );

    expect(navigationBar.destinations.length, 5);

    final labels = navigationBar.destinations
        .whereType<NavigationDestination>()
        .map((destination) => destination.label)
        .toList();

    expect(labels, <String>[
      'Home',
      'Medications',
      'Appointments',
      'Care Plan',
      'My Health',
    ]);
  });

  testWidgets('User can navigate to Medications', (WidgetTester tester) async {
    await setPhoneSize(tester);

    await tester.pumpWidget(const CareConnectApp());

    await tester.pumpAndSettle();

    final navigationBarFinder = find.byType(NavigationBar);

    expect(navigationBarFinder, findsOneWidget);

    final medicationsDestination = find.descendant(
      of: navigationBarFinder,
      matching: find.text('Medications'),
    );

    expect(medicationsDestination, findsOneWidget);

    await tester.tap(medicationsDestination);

    await tester.pumpAndSettle();

    final NavigationBar updatedNavigationBar = tester.widget<NavigationBar>(
      navigationBarFinder,
    );

    expect(updatedNavigationBar.selectedIndex, 1);

    expect(find.text('Your current medication schedule.'), findsOneWidget);

    expect(find.text('High blood pressure'), findsOneWidget);
  });

  testWidgets('Theme selector remains available', (WidgetTester tester) async {
    await setPhoneSize(tester);

    await tester.pumpWidget(const CareConnectApp());

    await tester.pumpAndSettle();

    final themeButton = find.text('Theme');

    expect(themeButton, findsOneWidget);

    await tester.tap(themeButton);

    await tester.pumpAndSettle();

    expect(find.text('Choose Your Theme'), findsOneWidget);

    expect(find.text('Neutral'), findsOneWidget);

    expect(find.text('Blue & Green'), findsOneWidget);

    expect(find.text('Purple & Pink'), findsOneWidget);

    expect(find.text('Kids'), findsOneWidget);
  });

  testWidgets('Tablet uses NavigationRail', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(800, 1200);

    tester.view.devicePixelRatio = 1.0;

    addTearDown(tester.view.resetPhysicalSize);

    addTearDown(tester.view.resetDevicePixelRatio);

    await tester.pumpWidget(const CareConnectApp());

    await tester.pumpAndSettle();

    expect(find.byType(NavigationRail), findsOneWidget);

    expect(find.byType(NavigationBar), findsNothing);
  });
}
