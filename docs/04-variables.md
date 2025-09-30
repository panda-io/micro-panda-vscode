## variables

### var

Variables declared with `var` are mutable, meaning their value can be changed after they are initialized.

### val

Variables declared with `val` are immutable, meaning their value cannot be changed after they are initialized.

```panda
val count: i8 = 10
count = 20 // Error: Cannot assign to 'val'

var id: i32 = 123
id = 456 // OK: 'var' can be reassigned
```
