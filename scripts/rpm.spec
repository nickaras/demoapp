%define _name
%define _version
%define _release 1%{?dist}

Name:           %{_name}
Version:        %{_version}
Release:        %{_release}
Summary:        slot

License:        Netent
URL:            https://netent.com
Source0:        %{name}.tar.gz

BuildRequires:  nodejs
Requires:       httpd

%description
Test slot game

%prep
%setup -q -c -n %{name}

%build
npm prune --production
npm rebuild


%install
rm -rf $RPM_BUILD_ROOT
mkdir -p %{buildroot}/var/www/html
cp -r ./images %{buildroot}/var/www/html
cp -r ./js %{buildroot}/var/www/html
cp ./index.html %{buildroot}/var/www/html

%files
%doc
%defattr(644, root, root, 755)
/var/www/html/images
/var/www/html/js
/var/www/html/index.html


%changelog
