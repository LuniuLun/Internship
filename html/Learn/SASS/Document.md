Sass
    - Base on Ruby
    - Có 2 phiên bản SCSS & SASS
    - SCSS: Sử dụng nhiều, cú pháp giống CSS

SCSS
    body {
        color: #fff;
    }

SASS
    body
        color: #fff;

* Sass Concept

1. Biến trong SASS
    - Đặt tên biến: #mainColor: orange;
    Note: Tách tất cả các biến trong project vào 1 file

2. Nested:
    nav {
        ul {
            li {
                a {
                    
                }
            }
        }
    }

3. Mixin:
    - Cú pháp khai báo:
        @mixin mixinName {
            css attribute 1
            css attribute 2
        }
    - Sử dụng mixin:
        @include mixinName()

4. Extend
5. If Else