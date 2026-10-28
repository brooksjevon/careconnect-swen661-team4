import 'package:flutter_test/flutter_test.dart';
import 'package:careconnect_flutter/features/medications/models/medication.dart';

void main() {
  group('Medication Model Unit Tests', () {
    test('Medication stores all required values correctly', () {
      const medication = Medication(
        id: 'med-001',
        name: 'Lisinopril',
        dose: '10 mg',
        take: '1 tablet',
        when: 'Once each day',
        usedFor: 'High blood pressure',
      );

      expect(medication.id, 'med-001');
      expect(medication.name, 'Lisinopril');
      expect(medication.dose, '10 mg');
      expect(medication.take, '1 tablet');
      expect(medication.when, 'Once each day');
      expect(medication.usedFor, 'High blood pressure');
    });

    test('Medication defaults takenToday to false', () {
      const medication = Medication(
        id: 'med-001',
        name: 'Lisinopril',
        dose: '10 mg',
        take: '1 tablet',
        when: 'Once each day',
        usedFor: 'High blood pressure',
      );

      expect(medication.takenToday, isFalse);
    });

    test('copyWith can mark medication as taken', () {
      const medication = Medication(
        id: 'med-001',
        name: 'Lisinopril',
        dose: '10 mg',
        take: '1 tablet',
        when: 'Once each day',
        usedFor: 'High blood pressure',
      );

      final updatedMedication = medication.copyWith(takenToday: true);

      expect(updatedMedication.takenToday, isTrue);
    });

    test('copyWith keeps original medication data', () {
      const medication = Medication(
        id: 'med-001',
        name: 'Lisinopril',
        dose: '10 mg',
        take: '1 tablet',
        when: 'Once each day',
        usedFor: 'High blood pressure',
      );

      final updatedMedication = medication.copyWith(takenToday: true);

      expect(updatedMedication.id, medication.id);
      expect(updatedMedication.name, medication.name);
      expect(updatedMedication.dose, medication.dose);
      expect(updatedMedication.take, medication.take);
      expect(updatedMedication.when, medication.when);
      expect(updatedMedication.usedFor, medication.usedFor);
    });

    test('copyWith without a value keeps existing takenToday state', () {
      const medication = Medication(
        id: 'med-001',
        name: 'Lisinopril',
        dose: '10 mg',
        take: '1 tablet',
        when: 'Once each day',
        usedFor: 'High blood pressure',
        takenToday: true,
      );

      final copiedMedication = medication.copyWith();

      expect(copiedMedication.takenToday, isTrue);
    });
  });
}