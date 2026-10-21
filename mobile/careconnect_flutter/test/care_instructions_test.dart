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

  Future<void> openCarePlan(WidgetTester tester) async {
    await setPhoneSize(tester);

    await tester.pumpWidget(const CareConnectApp());

    await tester.pumpAndSettle();

    final navigationBar = find.byType(NavigationBar);

    final destination = find.descendant(
      of: navigationBar,
      matching: find.text('Care Plan'),
    );

    await tester.tap(destination);
    await tester.pumpAndSettle();
  }

  testWidgets('User can open sequential care instructions', (
    WidgetTester tester,
  ) async {
    await openCarePlan(tester);

    final viewInstructions = find.text('View Instructions');

    await tester.scrollUntilVisible(viewInstructions, 250);

    await tester.tap(viewInstructions);

    await tester.pumpAndSettle();

    expect(find.text('Care Instructions'), findsOneWidget);

    expect(find.text('What to Do'), findsOneWidget);

    expect(find.text('Drink a glass of water.'), findsOneWidget);

    expect(find.text('Pay attention to how you feel.'), findsOneWidget);
  });

  testWidgets('User can complete sequential care instructions', (
    WidgetTester tester,
  ) async {
    await openCarePlan(tester);

    final viewInstructions = find.text('View Instructions');

    await tester.scrollUntilVisible(viewInstructions, 250);

    await tester.tap(viewInstructions);

    await tester.pumpAndSettle();

    await tester.tap(
      find.widgetWithText(CheckboxListTile, 'Drink a glass of water.'),
    );

    await tester.pump();

    await tester.tap(
      find.widgetWithText(CheckboxListTile, 'Pay attention to how you feel.'),
    );

    await tester.pump();

    final thirdStep = find.widgetWithText(
      CheckboxListTile,
      'Contact your caregiver if your symptoms get worse.',
    );

    await tester.scrollUntilVisible(thirdStep, 250);

    await tester.tap(thirdStep);

    await tester.pumpAndSettle();

    final finishButton = find.text('Finish Instructions');

    await tester.scrollUntilVisible(finishButton, 250);

    await tester.tap(finishButton);

    await tester.pumpAndSettle();

    expect(find.text('Care instructions complete.'), findsOneWidget);
  });
}
