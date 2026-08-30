import 'package:flutter/material.dart';

import '../../features/appointments/appointments_screen.dart';
import '../../features/care_plan/care_plan_screen.dart';
import '../../features/home/home_screen.dart';
import '../../features/medications/medications_screen.dart';
import '../../features/my_health/my_health_screen.dart';
import '../theme/care_theme_option.dart';

class CareConnectShell extends StatefulWidget {
  final CareThemeOption selectedTheme;
  final ValueChanged<CareThemeOption> onThemeChanged;

  const CareConnectShell({
    super.key,
    required this.selectedTheme,
    required this.onThemeChanged,
  });

  @override
  State<CareConnectShell> createState() => _CareConnectShellState();
}

class _CareConnectShellState extends State<CareConnectShell> {
  int selectedIndex = 0;

  List<Widget> get screens {
    return [
      HomeScreen(
        selectedTheme: widget.selectedTheme,
        onThemeChanged: widget.onThemeChanged,
      ),
      const MedicationsScreen(),
      const AppointmentsScreen(),
      const CarePlanScreen(),
      const MyHealthScreen(),
    ];
  }

  void selectDestination(int index) {
    setState(() {
      selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final bool useNavigationRail = constraints.maxWidth >= 600;

        if (useNavigationRail) {
          return _buildTabletLayout();
        }

        return _buildPhoneLayout();
      },
    );
  }

  Widget _buildPhoneLayout() {
    return Scaffold(
      body: IndexedStack(index: selectedIndex, children: screens),
      bottomNavigationBar: NavigationBar(
        selectedIndex: selectedIndex,
        onDestinationSelected: selectDestination,
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Icons.medication_outlined),
            selectedIcon: Icon(Icons.medication),
            label: 'Medications',
          ),
          NavigationDestination(
            icon: Icon(Icons.calendar_month_outlined),
            selectedIcon: Icon(Icons.calendar_month),
            label: 'Appointments',
          ),
          NavigationDestination(
            icon: Icon(Icons.checklist_outlined),
            selectedIcon: Icon(Icons.checklist),
            label: 'Care Plan',
          ),
          NavigationDestination(
            icon: Icon(Icons.favorite_outline),
            selectedIcon: Icon(Icons.favorite),
            label: 'My Health',
          ),
        ],
      ),
    );
  }

  Widget _buildTabletLayout() {
    return Scaffold(
      body: SafeArea(
        child: Row(
          children: [
            NavigationRail(
              selectedIndex: selectedIndex,
              onDestinationSelected: selectDestination,
              labelType: NavigationRailLabelType.all,
              destinations: const [
                NavigationRailDestination(
                  icon: Icon(Icons.home_outlined),
                  selectedIcon: Icon(Icons.home),
                  label: Text('Home'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.medication_outlined),
                  selectedIcon: Icon(Icons.medication),
                  label: Text('Medications'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.calendar_month_outlined),
                  selectedIcon: Icon(Icons.calendar_month),
                  label: Text('Appointments'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.checklist_outlined),
                  selectedIcon: Icon(Icons.checklist),
                  label: Text('Care Plan'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.favorite_outline),
                  selectedIcon: Icon(Icons.favorite),
                  label: Text('My Health'),
                ),
              ],
            ),
            const VerticalDivider(width: 1),
            Expanded(
              child: IndexedStack(index: selectedIndex, children: screens),
            ),
          ],
        ),
      ),
    );
  }
}
