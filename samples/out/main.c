#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>

typedef struct { uint8_t* ptr; size_t size; } __Slice_uint8_t;

int32_t main__main(void);
void io__println(void);
void io__print_str(__Slice_uint8_t s);
void io__print_bool(bool v);
void io__print_u64(uint64_t v);
void io__print_u32(uint32_t v);
void io__print_u16(uint16_t v);
void io__print_u8(uint8_t v);
void io__print_i64(int64_t v);
void io__print_i32(int32_t v);
void io__print_i16(int16_t v);
void io__print_i8(int8_t v);
void io__print_float(float v, uint32_t decimals);
void io__print_fixed(int32_t v, uint32_t decimals);

int32_t main__main(void) {
  io__print_str((__Slice_uint8_t){(uint8_t*)"Hello, Micro-Panda!", sizeof("Hello, Micro-Panda!") - 1});
  return 0;
}

void io__println(void) {
  putchar(10);
}

void io__print_str(__Slice_uint8_t s) {
  int32_t i = 0;
  while ((i < s.size)) {
    putchar(s.ptr[i]);
    (i += 1);
  }
}

void io__print_bool(bool v) {
  if (v) {
    putchar('t');
    putchar('r');
    putchar('u');
    putchar('e');
  } else {
    putchar('f');
    putchar('a');
    putchar('l');
    putchar('s');
    putchar('e');
  }
}

void io__print_u64(uint64_t v) {
  uint8_t buf[20];
  int32_t i = 19;
  if ((v == 0)) {
    putchar('0');
    return;
  }
  while ((v > 0)) {
    (buf[i] = ((uint8_t)(((v % 10) + 48))));
    (v = (v / 10));
    (i -= 1);
  }
  int32_t j = (i + 1);
  while ((j < 20)) {
    putchar(buf[j]);
    (j += 1);
  }
}

void io__print_u32(uint32_t v) {
  io__print_u64(((uint64_t)(v)));
}

void io__print_u16(uint16_t v) {
  io__print_u64(((uint64_t)(v)));
}

void io__print_u8(uint8_t v) {
  io__print_u64(((uint64_t)(v)));
}

void io__print_i64(int64_t v) {
  if ((v < 0)) {
    putchar('-');
    io__print_u64(((uint64_t)((((int64_t)(0)) - v))));
  } else {
    io__print_u64(((uint64_t)(v)));
  }
}

void io__print_i32(int32_t v) {
  io__print_i64(((int64_t)(v)));
}

void io__print_i16(int16_t v) {
  io__print_i64(((int64_t)(v)));
}

void io__print_i8(int8_t v) {
  io__print_i64(((int64_t)(v)));
}

void io__print_float(float v, uint32_t decimals) {
  float abs = v;
  if ((v < 0)) {
    putchar('-');
    (abs = (0.0f - v));
  }
  const int32_t int_part = ((int32_t)(abs));
  io__print_i32(int_part);
  if ((decimals > 0)) {
    putchar('.');
    float frac = (abs - ((float)(int_part)));
    uint32_t i = 0;
    while ((i < decimals)) {
      (frac = (frac * 10.0f));
      const int32_t digit = ((int32_t)(frac));
      putchar(((uint8_t)((digit + 48))));
      (frac = (frac - ((float)(digit))));
      (i += 1);
    }
  }
}

void io__print_fixed(int32_t v, uint32_t decimals) {
  uint32_t abs = 0;
  if ((v < 0)) {
    putchar('-');
    (abs = ((uint32_t)((0 - v))));
  } else {
    (abs = ((uint32_t)(v)));
  }
  io__print_u32((abs >> 16));
  if ((decimals > 0)) {
    putchar('.');
    uint32_t frac = (abs & 0xFFFF);
    uint32_t i = 0;
    while ((i < decimals)) {
      (frac *= 10);
      putchar(((uint8_t)(((frac >> 16) + 48))));
      (frac = (frac & 0xFFFF));
      (i += 1);
    }
  }
}

int main(void) { return main__main(); }

