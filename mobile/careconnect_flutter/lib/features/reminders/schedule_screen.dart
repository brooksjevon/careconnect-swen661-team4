import 'package:flutter/material.dart';

import '../../app/theme/app_spacing.dart';

class ScheduleScreen extends StatefulWidget {
  const ScheduleScreen({super.key});

  @override
  State<ScheduleScreen> createState() => _ScheduleScreenState();
}

class _ScheduleScreenState extends State<ScheduleScreen> {
  final List<_ScheduleItem> items = [
    const _ScheduleItem(
      title: 'Morning medication',
      time: '8:00 AM',
      description: 'Take your morning medication.',
      icon: Icons.medication_outlined,
    ),
    const _ScheduleItem(
      title: 'Drink water',
      time: '12:00 PM',
      description: 'Complete your hydration care task.',
      icon: Icons.water_drop_outlined,
    ),
    const _ScheduleItem(
      title: 'Check blood pressure',
      time: '6:00 PM',
      description: 'Check and record your blood pressure.',
      icon: Icons.monitor_heart_outlined,
    ),
  ];

  void toggleComplete(int index, bool? value) {
    setState(() {
      items[index] = items[index].copyWith(complete: value ?? false);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Schedule')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.base),
          children: [
            Text('Today', style: Theme.of(context).textTheme.headlineLarge),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Your reminders and care activities in one place.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: AppSpacing.lg),
            ...items.asMap().entries.map((entry) {
              final index = entry.key;
              final item = entry.value;

              return Padding(
                padding: const EdgeInsets.only(bottom: AppSpacing.md),
                child: Card(
                  child: CheckboxListTile(
                    value: item.complete,
                    onChanged: (value) {
                      toggleComplete(index, value);
                    },
                    secondary: Icon(item.icon, semanticLabel: item.title),
                    title: Text(item.title),
                    subtitle: Text('${item.time}\n${item.description}'),
                    isThreeLine: true,
                    controlAffinity: ListTileControlAffinity.trailing,
                  ),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}

class _ScheduleItem {
  final String title;
  final String time;
  final String description;
  final IconData icon;
  final bool complete;

  const _ScheduleItem({
    required this.title,
    required this.time,
    required this.description,
    required this.icon,
    this.complete = false,
  });

  _ScheduleItem copyWith({bool? complete}) {
    return _ScheduleItem(
      title: title,
      time: time,
      description: description,
      icon: icon,
      complete: complete ?? this.complete,
    );
  }
}
