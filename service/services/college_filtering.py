def filter_schools(schools, state=None, program=None, max_tuition=None):
    filtered = []

    for school in schools:
        try:
            name = school.get("school.name", "N/A")
            school_state = school.get("school.state", "").upper()

            print(f"\n📘 Checking: {name} ({school_state})")

            # Filter by state
            if state and school_state != state.upper():
                print(" ❌ Skipped: State mismatch")
                continue

            # Filter by tuition
            tuition = school.get("latest.cost.tuition.in_state")
            if max_tuition:
                if tuition is None:
                    print(" ❌ Skipped: Tuition missing")
                    continue
                if not isinstance(tuition, (int, float)) or tuition > max_tuition:
                    print(f" ❌ Skipped: Tuition too high → ${tuition}")
                    continue

            # Filter by program
            if program:
                programs = school.get("latest.programs.cip_4_digit", [])
                match = any(p.get("title") == program for p in programs)
                if not match:
                    print(" ❌ Skipped: Program not offered")
                    continue

            print(" ✅ Included")
            filtered.append(school)

        except Exception as e:
            print(f" ⚠️ Error on {name}: {e}")
            continue

    print(f"\n🎯 Final filtered count: {len(filtered)}")
    return filtered
