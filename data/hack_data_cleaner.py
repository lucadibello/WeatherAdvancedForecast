import pandas as pd
import glob


def main():
    path = 'C:\\Users\\guebe\\OneDrive\\Documenti\\School-DESKTOP-GABRQRB\\SUPSI-DS2\\Supervised\\experiments\\csv\\'  # use your path
    all_files = glob.glob(path + "*.csv")
    print(all_files)
    df = pd.read_csv(all_files[0], ';')
    final = pd.DataFrame()
    final['country'] = None
    final['date'] = None
    for value in df[df.columns[0]]:
        for col in df.columns[3:]:
            final.append({'country': value, 'date': col}, ignore_index=True)

    for filename in all_files:
        df = pd.read_csv(filename)
        df.rename(columns={df.columns[0]: 'country'})
        measure = filename[:-4]
        df.drop(df.columns[1], df.columns[2])
        df.melt(id_vars='country', var_name='date', value_name=measure)
        final.merge(df, how='outer', on=['country', 'date'])

    final.to_csv('world_all.csv', sep=';')


if __name__ == '__main__':
    main()
