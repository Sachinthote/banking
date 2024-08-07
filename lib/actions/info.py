MOD = 10**9 + 7

def char_to_bit(c):
    return 1 << (ord(c) - ord('a'))

def count_valid_strings(N, L, R):
    def valid_within_bounds(bound, is_lower):
        dp = [[[0] * (1 << 10) for _ in range(2)] for _ in range(N + 1)]
        dp[0][1][0] = 1
        for i in range(N):
            for tight in range(2):
                for mask in range(1 << 10):
                    if dp[i][tight][mask] == 0:
                        continue
                    limit = ord(bound[i]) if tight else ord('z')
                    for ch in range(ord('a'), limit + 1):
                        new_mask = mask | (1 << (ch - ord('a')))
                        if new_mask & (new_mask - 1) == 0:  # Ensure at least two different characters
                            continue
                        dp[i + 1][tight & (ch == ord(bound[i]))][new_mask] += dp[i][tight][mask]
                        dp[i + 1][tight & (ch == ord(bound[i]))][new_mask] %= MOD
        return sum(dp[N][0]) + sum(dp[N][1]) - dp[N][1][(1 << 10) - 1]
    
    count_L = valid_within_bounds(L, True)
    count_R = valid_within_bounds(R, False)
    
    return (count_R - count_L + MOD) % MOD

def main():
    import sys
    input = sys.stdin.read
    data = input().split()
    
    N = int(data[0])
    L = data[1]
    R = data[2]
    
    result = count_valid_strings(N, L, R)
    print(result)

if _name_ == "_main_":
    main()