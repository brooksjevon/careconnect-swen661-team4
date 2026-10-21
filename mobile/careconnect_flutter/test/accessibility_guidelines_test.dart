import 'package:careconnect_flutter/app/careconnect_app.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  Future<void> pumpCareConnect(WidgetTester tester) async {
    tester.view.physicalSize = const Size(390, 844);
    tester.view.devicePixelRatio = 1.0;

    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);

    await tester.pumpWidget(const CareConnectApp());
    await tester.pumpAndSettle();
  }

  testWidgets('CareConnect meets labeled tap target guideline', (
    WidgetTester tester,
  ) async {
    await pumpCareConnect(tester);

    await expectLater(
      tester,
      meetsGuideline(labeledTapTargetGuideline),
    );
  });

  testWidgets('CareConnect meets Android tap target guideline', (
    WidgetTester tester,
  ) async {
    await pumpCareConnect(tester);

    await expectLater(
      tester,
      meetsGuideline(androidTapTargetGuideline),
    );
  });

  testWidgets('CareConnect meets iOS tap target guideline', (
    WidgetTester tester,
  ) async {
    await pumpCareConnect(tester);

    await expectLater(
      tester,
      meetsGuideline(iOSTapTargetGuideline),
    );
  });

  testWidgets('CareConnect meets text contrast guideline', (
    WidgetTester tester,
  ) async {
    await pumpCareConnect(tester);

    await expectLater(
      tester,
      meetsGuideline(textContrastGuideline),
    );
  });
}
