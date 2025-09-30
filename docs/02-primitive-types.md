
### Primitive types

| Type | Description | Range/Size |
|---|---|---|
| `i8` | Signed 8-bit integer | -128 to 127 |
| `i16` | Signed 16-bit integer | -32,768 to 32,767 |
| `i32` | Signed 32-bit integer | -2,147,483,648 to 2,147,483,647 |
| `i64` | Signed 64-bit integer | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |
| `byte` | Unsigned 8-bit integer | 0 to 255 |
| `size` | Unsigned pointer size integer | |
| `f16` | 16-bit floating point number | |
| `f32` | 32-bit floating point number | |
| `f64` | 64-bit floating point number | |
| `bool` | Boolean value | true or false |
| `void` | Empty type | |

### Integer literals

Integer literals can be written in decimal, hexadecimal, octal or binary.

```panda
val decimal: i32 = 123
val hexadecimal: i32 = 0xFF
val octal: i32 = 0o123
val binary: i32 = 0b1010
```