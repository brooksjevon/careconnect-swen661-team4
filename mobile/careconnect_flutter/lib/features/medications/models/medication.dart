class Medication {
  final String id;
  final String name;
  final String dose;
  final String take;
  final String when;
  final String usedFor;
  final bool takenToday;

  const Medication({
    required this.id,
    required this.name,
    required this.dose,
    required this.take,
    required this.when,
    required this.usedFor,
    this.takenToday = false,
  });

  Medication copyWith({bool? takenToday}) {
    return Medication(
      id: id,
      name: name,
      dose: dose,
      take: take,
      when: when,
      usedFor: usedFor,
      takenToday: takenToday ?? this.takenToday,
    );
  }
}
