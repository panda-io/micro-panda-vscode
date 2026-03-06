#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>

typedef struct { uint8_t* ptr; size_t size; } __Slice_uint8_t;

typedef struct Sample Sample;

struct Sample {
  int32_t field;
};

int32_t main(void);
int32_t Sample_add(Sample* this, int32_t a, int32_t b);

int32_t main(void) {
  const Sample sample = {0};
  const int32_t result = Sample_add((&sample), 5, 7);
  return 0;
}

int32_t Sample_add(Sample* this, int32_t a, int32_t b) {
  return (a + b);
}

