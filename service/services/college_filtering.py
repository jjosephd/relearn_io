def filter_schools(schools, state=None, program=None, max_tuition=None):
    """
    Filters the list of schools based on optional state, program, and tuition cap.
    Returns a simplified structure including only the matched program.
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
            matched_program = None
            if program:
                programs = school.get("latest.programs.cip_4_digit", [])
                for p in programs:
                    title = p.get("title", "").lower()
                    if program.lower() in title:
                        matched_program = p.get("title")
                        break

                if not matched_program:
                    print(f"❌ Skipped: Program '{program}' not found")
                    continue

            # Append simplified and relevant data
            filtered.append({
                "school_name": school.get("school.name"),
                "city": school.get("school.city"),
                "state": school.get("school.state"),
                "in_state_tuition": tuition,
                "out_of_state_tuition": school.get("latest.cost.tuition.out_of_state"),
                "admission_rate": school.get("latest.admissions.admission_rate.overall"),
                "matched_program": matched_program if matched_program else None
            })

        except KeyError as e:
            print(f'Error filtering school: missing key {e}')
        except TypeError as e:
            print(f'Error filtering school: type error {e}')
        except Exception as e:
            print(f"Unexpected error filtering school: {e}")
            raise

    return filtered
