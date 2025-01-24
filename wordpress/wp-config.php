<?php

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'brt_projetos');

/** Database username */
define('DB_USER', 'root');

/** Database password */
define('DB_PASSWORD', '');

/** Database hostname */
define('DB_HOST', 'localhost');

/** Database charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

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
define('AUTH_KEY',         'Jc{W B/QA_Xr1]7M@k+&t_X#6s} ~|y#]~1xcetj;C20&3,[`AQo6eT+Am-+5UG2');
define('SECURE_AUTH_KEY',  '-ajabk9iDdr_.<!hvJU+I23g ICK+fSv=q+GqMzhVj@pza(5%,5E~nVl uPBd]?`');
define('LOGGED_IN_KEY',    'q.f@,,T)Kj`UhpL+)xG)L(<:}{jV4u.q%%Z=YW|A~k.zT|yY3zqVYi|h{dr0Zeb/');
define('NONCE_KEY',        'z&2Y;a0a|ux2vY|#zJbf)f%<6>)u434]@7+}nXTXs]?C!7T<h^z+W}UYtB_ij,vu');
define('AUTH_SALT',        'n6k-$|&_W^2C(bTonCkAm^1k|=xmP=4D{Tl1*)wn)&b!$]cP2+,|xzVNl>k<Yu/R');
define('SECURE_AUTH_SALT', 'TiE}Z?(H-ER{X20*QU9d8;z~2-334|u0@VBg3[kOP|2(0Fgnhp|jcHBWHqW_gT1=');
define('LOGGED_IN_SALT',   'A!_TH,w!g>-~vHzrB-+LJlw:7CqNkG%.R)>aOa9{+npBQ#SOSeuWU)O+ gUJSi,3');
define('NONCE_SALT',       'Zol~iQ?3o+ppyWWE9ogZFOOVK;9qu8J-p@wwAdMKAoHa|;y.28h/>cq^FaERt7J9');
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
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
$debug = (isset($_REQUEST['debug'])) ? true : false;
define('WP_DEBUG', $debug);

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if (!defined('ABSPATH')) {
	define('ABSPATH', __DIR__ . '/');
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
