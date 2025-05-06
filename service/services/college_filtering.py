def filter_schools(schools, state=None, program=None, max_tuition=None):
    """
    Filters the list of schools based on optional state, program, and tuition cap.
    """
    filtered = []

    for school in schools:
        try:
            # State filter
            if state and school.get("school.state") != state.upper():
                continue

            # Tuition filter (in-state only for now)
            tuition = school.get("latest.cost.tuition.in_state")
            if max_tuition and (not isinstance(tuition, (int, float)) or tuition > max_tuition):
                continue

            # Program filter
            if program:
                programs = school.get("latest.programs.cip_4_digit", [])
                if not any(p.get("title") == program for p in programs):
                    continue

            filtered.append(school)

        except Exception as e:
            print(f"Error filtering school {school.get('school.name')}: {e}")
            continue

    return filtered
