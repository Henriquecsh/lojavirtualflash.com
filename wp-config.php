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
define('DB_NAME', 'cd_projetos');

/** Database username */
define('DB_USER', 'root');

/** Database password */
define('DB_PASSWORD', '');

/** Database hostname */
define('DB_HOST', 'localhost');

/** Database charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The database collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

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
define('AUTH_KEY',         'o+_+]An0>J7F]N~_&!di6_&d|!{O&)YgT0xiL]]`V QUSZ]b/8322T #z^ :od%2');
define('SECURE_AUTH_KEY',  '~BzdQ~Wa!}YB6OSz9AN@fvs0SY1)rN[zNVj|MyE6(2[dFAmJoZEp6yb>n1fit!E6');
define('LOGGED_IN_KEY',    'Y-.]a>`Z`}I1~aW2Yx4jjmQuswE#tt<NU3%N5#(8ObUf[Z53{^dJV.:kRgDu=h(%');
define('NONCE_KEY',        '*Iy ^2^9|SpYY/1]aXsfgD*EIkPt@K!:18,O_>+#!|L#Fw})us6f7H0)zr988r3n');
define('AUTH_SALT',        'dnVxLOwl,#4.XXN:*WQ]@.C2+R !EFj=_JN^WCUw-ZX*9N<tB5u;%c-U8,2ayN:{');
define('SECURE_AUTH_SALT', 'lEGCfZM6Cu8+cL |}ghL!&shKlr2R?~QyPhq8hBY)_{ ^hLu T.,vM-*FvRh3Y#-');
define('LOGGED_IN_SALT',   '#1<m1`Rx|Udi_mKPh+BsC&59g1$Ha^&*apzK9*!P4%$<87X.AOgd:<p1}4J{=P1C');
define('NONCE_SALT',       '5$Xo}O/2zIm@+@^#FJTWPdl_IVNzehmSD-f /K#NwXTz@&]&LTban&[i[D[tm)H~');

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

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
define('WP_DEBUG', false);

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if (! defined('ABSPATH')) {
	define('ABSPATH', __DIR__ . '/');
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
