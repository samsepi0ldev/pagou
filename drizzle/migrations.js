// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_swift_the_initiative.sql';
import m0001 from './0001_bored_clint_barton.sql';
import m0002 from './0002_pretty_shadow_king.sql';
import m0003 from './0003_faulty_karen_page.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003
    }
  }
  