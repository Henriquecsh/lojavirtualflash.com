<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u395352277_multisite' );

/** Database username */
define( 'DB_USER', 'u395352277_multisite' );

/** Database password */
define( 'DB_PASSWORD', 'IgD!2DNJu6$' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '^JJ{u~KliKi4_K8K}o4WNT/aI6yVV,xAwh7`ec@+uUc9IL5wxg)g/PJs3][m(;,^' );
define( 'SECURE_AUTH_KEY',  '%O^DCy1b#h8Y;3P Q:oh0n&v-jf~j~0yT|9Ao^IKq|RqN,z2fnUR86rxl+S;<bTW' );
define( 'LOGGED_IN_KEY',    'U[vo.EOJcMV:M2%q;()(e0]n8F=8|!#9+(5MX3Ku|^&)BB:aeZo^yHa@>fgh@1(6' );
define( 'NONCE_KEY',        '+<<!c#}|b%F11ye$0:V~m%:M/H84!M70<prleGjVb--o/2o~%@{U.DrdZRnVkp,J' );
define( 'AUTH_SALT',        '1<WRLipYLgSW)v4^X!S*k@SStkh4X/&hZC2AK>BRk]Bu8;11;;+^OPs!RCU+Rrut' );
define( 'SECURE_AUTH_SALT', '>N9}_us2aWcD[MmV)eO:-%?ecGoLTJzPg_u?+94Mp{67`cm@21|%-PKEnAS-_VwT' );
define( 'LOGGED_IN_SALT',   '&;FmK,G8uh* EO8DeqTFsyZ|I#u~</,4^*rOAx$3t2%d>%fa>I _VJluRyUA_pL7' );
define( 'NONCE_SALT',       'ea/v=.S!PKN/7t=qH5_kxy^D>^!6(JqUK7nn>%71AT>yo;m2pO|lfmseitgSX9`q' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wplf_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
