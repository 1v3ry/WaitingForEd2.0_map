WaitingForEd2.0_map
===================

A world-wide openstreetmap where people can upload photos of themselves in reference to the #WaitingForEd protest action at 19th Apr 2014

------------------

The map will be available on a subdomain of http://www.snowden-support.com/.

The CREATE(s) of the mySQL (5.5) table(s) are the following:
```MYSQL
CREATE TABLE `submits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(100) NOT NULL,
  `lat` varchar(50) NOT NULL,
  `lon` varchar(50) NOT NULL,
  `text` text,
  `images` varchar(1000) NOT NULL COMMENT 'IMG1.png[;IMG2.jpg[;IMG3.gif[...]]]',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
```

Usable plug-ins:

folder     | version
---------- | -------
/jquery     | v1.10.4
/openlayers | v2.13.1

