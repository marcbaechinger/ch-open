ch-open 2013 - JS Workshop repository
=================

baas (Backen as a service)
=================
A NetBeans project with a maven web application providing JAX-RS services based on Jersey.

1. Start project baas (on Glassfish)
2. Go to https://localhost:8181/baas/api/todo to get a JSON array with two todo items

works? 

Enable security (optional at first)
--------
1. Enable security by removing comments of security contraint in web.xml
2. Create a security realm in Glassfish console (localhost:4848)

<b>Create a file realm</b>

Go to 

'Konfigurationen - server-config - Sicherheit - Realms'

and create a file realm:

<b>JAAS-Kontext:</b> fileRealm<br/>
<b>Schlüsseldatei (default):</b> ${com.sun.aas.instanceRoot}/config/keyfile 

- Create a user with group 'user'


HTML5-Client
=================
- Run project 'mvc-todo' in Netbeans (http://localhost:8383)
- A dialog asks for username and password in the format: &lt;user&gt;:&lt;password&gt; (quick hack to avoid a two input field dialog;-)

- Enter credentials created in the file realm in glassfish (or bla:secret if security not enabled)

The HTML5 app should now start and display a list of two todo items. Add new and delete items as you whish (persistence in-memory only).


